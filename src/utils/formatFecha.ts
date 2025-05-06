export const formatDate = (string: string)=> {
    const date = new Date(string);
    const formate = new Intl.DateTimeFormat("es-ES",{
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return formate.format(date)
}