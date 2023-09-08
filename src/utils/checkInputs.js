export default function checkInputs(input){
    const { file, span } = input;
    if(file === null || span === null) return "Please fill all the inputs";
    if(file === undefined || span === undefined) return "Please fill all the inputs";
    if(parseFloat(span) / parseInt(span) !== 1) return "Span must be an integer";
    return null;
}