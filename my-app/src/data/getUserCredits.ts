import { unstable_cache } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export const getUserCredits = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) return "not logged in";

    return unstable_cache(
        async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("credits")
            .eq("id", user.id)
            .single();

        if (error || !data) return 0;

        return data.credits;
        },
        [`user-credits-${user.id}`],
        {
        revalidate: 3600,
        tags: [`user-credits-${user.id}`],
        }
    )();
};
