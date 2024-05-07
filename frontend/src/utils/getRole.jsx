const getRole = (tokenPayload) => {
    if (tokenPayload["role"]) {
        return tokenPayload["role"];
    } else if (tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        return tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return null;
}


export default getRole