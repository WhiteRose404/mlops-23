// get the url from the env file
const url = process.env.REACT_APP_API_URL;



export default async function fetchResult({ file, span }) {
    const inputData = {
        file: file,
        span: span
    }
    try{
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
            status: 'error',
            data: err,
        };
    }
}
