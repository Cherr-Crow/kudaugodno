"use client";

export const searchData = async (textForSearch: string) => {
    try {
        /*
             const response = await fetch('https://pokeapi.co/api/v2/pokemon',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ text: textForSearch }),
               }
            );*/
            
        const response = await fetch(`${process.env.NEXT_PUBLIC_SEARCH_FORM}`);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}: ${response.statusText}`);
        }
        const dataReq: any = await response.json()
        // console.log(data)
        return dataReq
    } catch (er) {
        console.error('Error searchData:', er);
        throw new Error('Failed to fetch.');
    }
};


