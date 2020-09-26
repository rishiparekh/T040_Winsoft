exports.extract_enemy_camps = (decrypted_message, all_camp_names) => {
    let enemy_camps = []
    all_camp_names.forEach(camp_name => {
        const name_camp = new RegExp(camp_name);
        const is_enemy = name_camp.exec(decrypted_message);
        if(is_enemy){
            enemy_camps.push(camp_name);
        }
    });
    return enemy_camps;
}