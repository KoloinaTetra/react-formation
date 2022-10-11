const KEY = "UxKQQHL6z4rg2339Tr4cq";

function $getUser(){
    try {
        var text = localStorage.getItem(KEY);
        var user = JSON.parse(text);
        return user;
    }
    catch(e){
        return null;
    }
}

function $setUser(user){
    localStorage.setItem(KEY, JSON.stringify(user))
}

function $resetUser(){
    localStorage.setItem(KEY, "")
}

export {
    $getUser,
    $setUser,
    $resetUser,
}
