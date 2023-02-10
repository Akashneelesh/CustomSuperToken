const { web3tx, toWad } = require("@decentral.ee/web3-helpers")
const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework")
const {
	builtTruffleContractLoader
} = require("@superfluid-finance/ethereum-contracts/scripts/libs/common")
const SuperfluidSDK = require("@superfluid-finance/js-sdk")
const { fastForward } = require("./util")
const { setWeb3Provider } = require("@decentral.ee/web3-helpers/src/config")
const { web3 } = require("@project-serum/anchor")

const AnyMintSuperToken = artifacts.require("AnyMintSuperToken")
const receiver = "0x304190e2110E8B88d55Ec1EdCaD0ED0541323C07"

module.exports = async function (callback) {
	const name = "Metaverse Ventures Pvt Ltd"
	const symbol = "MVPL"

	try {
		setWeb3Provider(web3.currentProvider)

		const chainId = await web3.eth.net.getId()
		const superTokenFactory = factory(chainId)

		const superToken = await web3tx(
			AnyMintSuperToken.new,
			"Deploy AnymintSuperToken"
		)()

		console.log(`Token deployed to ${anyMintSuperToken.address}`)

		await web3tx(superToken.initialize, "Initialze AnyMintSuperToken")(
			"Metaverse Ventures Pvt Ltd",
			"MVPL",
			superTokenFactory
		)

		await web3tx(superToken.mint, "User mints")({ from: receiver })

		callback()
	} catch (error) {
		console.error(error)
		callback(error)
	}
}
