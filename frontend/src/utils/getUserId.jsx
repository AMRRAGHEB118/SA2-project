const getUserId = (tokenPayload) => {
    if (tokenPayload["id"]) {
        return tokenPayload["id"];
    } else if (tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]) {
        return tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    }
    return null;
}


export default getUserId