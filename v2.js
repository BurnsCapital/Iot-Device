// inputs
var web3 = require('./core/blockchain');
var FauxMo = require('fauxmojs');

// internal
var EventEmitter = require('events');
class IOTEmitter extends EventEmitter {}
const iotEmitter = new IOTEmitter();

// output
//var iot = require('./core/gpio');

var ABI = require("./core/abi");

// what contract are we going to interact with: CHANGE THIS
var ADDR = '0x31C8dB13A1D81f5C92708bFFfCdff66461f620CB';

//contract
const iotd = web3.eth.contract(ABI);
var iotdevice = iotd.at(ADDR);
var iotevent = iotdevice.io()

iotevent.watch(function(error,result){
	if (!error){
	 iotEmitter.emit('event', result.args.device, result.args.state);
 }
});

// allow for wimo discovery over network

let fauxMo = new FauxMo(
  {
    devices: [
      {
        name: 'office light',
        port: 11000,
        handler: (action) => {
          iotEmitter.emit('event', 'office light', action);
        }
      }
    ]
  });

function state2int(state){
	if(state == 'on' || state == '1'){
		return 1;
	} else {
		return 0;
	}
}

//gpio action
iotEmitter.on('event',(dev, state) => {
	switch(dev){
		case 'office light' :
		  //iot.led.digitalWrite(state2int(state));
			console.log(state2int(state.toLowerCase()));
		  break;
		case 'device2':
		 	console.log(state2int(state));
			break;
	}

	console.log(dev, state);
});
