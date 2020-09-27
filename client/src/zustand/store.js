import create from 'zustand';

const INIT_STATE = {
    loading: true, 
    loggedIn: false
}

const [useStore] = create(set => ({
    ...INIT_STATE,
    init: () => init(set),
    login: (username, password) => login(username, password, set),
    logout: () => logout(set)
}))

const init = (set) => {
    if(localStorage.getItem('auth-token')){
        set({
            loading: false,
            loggedIn: true
        })
    }
    else{
        set({
            loading: false,
        })
    }
}

const login = async(username, password, set) => {
    try{
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const result = await response.json()
        if(result.message){
            await localStorage.setItem('auth-token', result.access_token)
            set({
                loggedIn: true
            })
        }
        else{
            alert("Invalid credentials")
        }
        
    }
    catch(error){
        console.log(error)
    }
}

const logout = (set) => {
    localStorage.removeItem('auth-token')
    set({
        loggedIn: false
    })
}

export default useStore