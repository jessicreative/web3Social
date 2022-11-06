# Dora: A decentralized knowledge-sharing platform with authenticity and transparency.

<picture>
  <img src="https://github.com/jessicreative/web3Social/blob/main/Screen%20Shot%202022-11-06%20at%203.49.33%20AM.png" width="500px">
</picture>

## Project Description

An entire industry of hiring spambots and paying for fake reviews by fake accounts intends to trick social media users into believing in a version of reality not supported by facts. Especially with social platforms with more seemingly personal anecdotes and interpersonal connections, the unsuspecting users are even more vulnerable to a message and ten comments by fake accounts underneath that “verifies” the truth and effectiveness of the statement.

Platforms like Quora, Twitter, and Reddit lose the credibility and community engagement so vital to users’ trust and reliance on the platform as information source once unverified fake messages with no trace of origin becomes rampant. Yet Web2 era knowledge platforms (e.g. Quora, Reddit, Twitter) lack reliable sourcing of information and incentive for users to behave honestly and responsibly.

This platform, Dora, combines React.js based front end and decentralized backends using multiple APIs to allow users to ask and answer questions in the community. Dora solves the problems of rampant fake accounts, irresponsible advocacy, and lack of incentive and mechanisms for building reputation with a digital identity.

We address these with three prominent features: First, the project implements Privacy-Preserving Proof-of-Personhood (PPPoP) using Worldcoin to ensure that each individual can only register for one account, preventing spam accounts. Second, the platform keeps the permanent intellectual record of individuals stored on-chain. This together with the single-shot nature of user's PPPoP ensures more responsible opinion-sharing. Third, democratic nature of upvoting and tokenization features incentivize and select for the most trust-worthy KOLs in the community. Collectively, Dora platform endeavors to create a truly high quality, responsible, safe community for discussion and knowledge sharing.


## How it's Made
- Frontend: React.js
- Authentications: Worldcoin, Walletconnect, Web3Auth; specifically, Worldcoin helps guarantee the unique identity of the user on the platform
- XMTP protocol-based chat features to facilitate direct discussion between community members
Backend API: Lens API (user database), IFPS (for storage of media)

<picture>
  <img src="https://github.com/jessicreative/web3Social/blob/main/Dora_UI.png">
</picture>
