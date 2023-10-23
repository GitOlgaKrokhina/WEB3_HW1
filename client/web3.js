const {Web3} = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/-00twLJCWxMW2PRPE6YW23CTaJe20xEB'));

// Контракт находится через https://sepolia.etherscan.io/address/0x19fb3d54363a3d204b3fae5768240350d9273c6e#code
const address = "0x19Fb3D54363A3D204b3Fae5768240350D9273C6e";

const ABI = require('../artifacts/contracts/StickersContract.sol/StickersContract.json').abi;

// Запрос уходит, в alchemy отображается, результат приходит
web3.eth.getBalance(address).then(console.log); 

var contract = new web3.eth.Contract(ABI, address);
console.log(contract.address);

//Вызов функций смарт-контракта
contract.methods.addSticker(126, true, 16, "ferrari").call().then(console.log);
contract.methods.deleteSticker().call().then(console.log);

// Функция запроса событий по адресу и фильтру
async function getEventsByAddressAndFilter(address, filter) {
    try {
      // Получаем все события, соответствующие адресу
      const events = await contract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: filter != null ? { address, ...filter } : { address },
      });
      // Выводим полученные события в консоль
      console.log(events);
    } catch (error) {
      console.error(error);
    }
  }
  
// Вызываем функцию запроса событий по адресу и фильтру
getEventsByAddressAndFilter(address, {});


// Получение слота storage контракта по индексу
async function getStorageSlotByIndex(contract, index) {
    try {
      const slotValue = await web3.eth.getStorageAt(contract.options.address, index);
      console.log("Storage Slot ${index}:", slotValue);
    } catch (error) {
      console.error(error);
    }
}
  
// Вызов функции для просмотра слота storage контракта по индексу
getStorageSlotByIndex(contract, 4541468);