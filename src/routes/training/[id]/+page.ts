import { supabaseClient } from "$lib/supabase";

export const load = ({ params }: any) => {
    const fetchProgram = async (id: any) => {
        const { data, error } = await supabaseClient.from('Programs').select('*').match({id});
        if(error) {
            return console.error(error);
        }
        return data[0];
    }
    return {
        program: fetchProgram(params.id)
    }

}