var $user = {
}

function $getUser(){
    return $user;
}

function $setUser(user){
    $user = {
        ...$user,
        ...user,
    }
}

function $resetUser(){
    $user = {};
}

export {
    $getUser,
    $setUser,
    $resetUser,
}
