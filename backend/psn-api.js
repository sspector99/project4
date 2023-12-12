const psnApi = require('psn-api')

async function psn() {
    const myNpsso = "W9H1k5hg3hf2NmbXZN9xkxJLo73os54bte7KpFrK51eyWqdqVQIXS6Im4dOiL0R7";
    const onlineId = "sspector_99"
    const accountId = "8306011463537561379"
    const npId = "c3NwZWN0b3JfOTlAYjYuZ2I="
    const accessCode = await psnApi.exchangeNpssoForCode(myNpsso);

    const authorization = await psnApi.exchangeCodeForAccessToken(accessCode);
    const now = new Date();
    const expirationDate = new Date(
        now.getTime() + authorization.expiresIn * 1000
    ).toISOString();
    const isAccessTokenExpired = new Date(expirationDate).getTime() < now.getTime();
    if (isAccessTokenExpired) {
        const updatedAuthorization = await psnApi.exchangeRefreshTokenForAuthTokens(authorization.refreshToken)
    }

    const allAccountsSearchResults = await psnApi.getProfileFromAccountId(authorization, accountId)
    const profilePicture = allAccountsSearchResults.personalDetail.profilePictures[3].url//.results[0]//.socialMetadata.accountId;
    const trophyTitles = await psnApi.getUserTitles(authorization, accountId);
    console.log(trophyTitles)
}

psn()

module.exports = { psn }