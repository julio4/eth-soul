import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log(`Deploying as ${deployer} on blockchain ${""}…`)

  const deployResult = await deploy('Sel', {
    from: deployer,
    log: true,
    args: [1000],
  })

  console.log(`Contract deployed at ${deployResult.address}`)
}
func.tags = ['Sel']
export default func
