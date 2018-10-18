pragma solidity ^0.4.25;

contract iot{

   event io(string device, string state);
   function IOT(string device,string state) public returns(bool success){
        emit io(device,state);
        return true;
    }
}
