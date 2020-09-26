exports.decrypt = (req, res) => {
    try{
        const { encrypted_message, key } = req.body

        const length_of_message = encrypted_message.length
        const num_rows = Math.ceil(length_of_message / key.length)

        let matrix = []
        for(let i=0; i<num_rows; i++) {
            matrix[i] = []
        }

        let count = 0
        while(count < length_of_message){
            for(let i=0; i<num_rows; i++){
                matrix[i].push(encrypted_message[count])
                count += 1
            }
        }

        let letters_of_key = key.split('')
        const sorted_letters = letters_of_key.sort()

        let indexes = {} // key-value pairs of lexicographic order of key's letters, for example { D: 0, E: 1, H: 2, I: 3, L: 4 }

        for(let i=0; i < sorted_letters.length; i++){
            indexes[sorted_letters[i]] = i
        }

        let decrypted_message = ''

        for(let i=0; i < num_rows; i++){
            for (letter of key){
                let character = matrix[i][indexes[letter]]
                if(character !== '_'){
                    decrypted_message += character
                }
            }
        }

        res.status(200).json({
            decrypted_message
        })
    }
    catch(error){
        res.status(500).send("Something went wrong")
    }    
}