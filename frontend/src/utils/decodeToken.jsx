const decodeJWT = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }

    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
}


export default decodeJWT