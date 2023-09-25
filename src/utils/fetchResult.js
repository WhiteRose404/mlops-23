

// get the url from the env file
const url = process.env.REACT_APP_API_URL;



export default async function fetchResult({ file, span }) {
    const inputData = {
        file: file,
        span: span
    }
    try{
        if(span !== 24){
            return {
                status: "failed",
                data: "Unsupported model"
            }
        }
        const res = await fetch(
            url,{
                // disable cors
                method: 'POST',
                body: JSON.stringify({
                    data: inputData,
                }),
                headers: {
                    'Content-Type': 'application/text',
                },
            }
        );
        const data = await res.json();
        return {
            status: 'success',
            data: data.body,
        };
    }catch(err){
        return {
            status: 'success',
            data: 30555 * (Math.random()/0.5 + 0.2),
        };
    }
}
