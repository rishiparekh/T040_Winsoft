exports.decrypt = (req, res) => {
    try{
        const { encrypted_message, key } = req.body

        const length_of_message = encrypted_message.length
        const length_of_key = key.length
        const number_of_rows = Math.ceil(length_of_message / length_of_key)

        const sorted_letters_of_key = key.split('').sort()

        let indexes = {} // key-value pairs of lexicographic order of key's letters, for example { D: 0, E: 1, H: 2, I: 3, L: 4 }

        for(let i=0; i < sorted_letters_of_key.length; i++){
            indexes[sorted_letters_of_key[i]] = i
        }

        let decrypted_message = ''

        outerLoop: for(let i=0; i < number_of_rows; i++){
            for (letter of key){
                let index = number_of_rows * indexes[letter] + i;
                let character = encrypted_message[index]
                if(character === '_'){
                    break outerLoop
                }
                decrypted_message += character
            }
        }

        res.status(200).json({
            decrypted_message
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }    
}