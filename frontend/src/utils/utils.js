function appendErrorMessages(response) {
    var messagesList = []
    for (var fieldError in response) {
        var messages = response[fieldError]
        messages = messages.isArray ? messages.join(' ') : messages
        messagesList.push(`${ fieldError }: ${ messages }`)
    }
    return messagesList
}

function castPrice(value) {
    return value.toFixed(2).replace('.', ',')
}

function title(pageTitle) {
    const mainTitle = 'JobsCalc'
    document.title = `${ mainTitle } | ${ pageTitle }`
}


export { appendErrorMessages, castPrice, title }