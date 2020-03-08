pragma solidity >=0.4.22 <0.7.0;

contract ServiceHistory {
    address public owner = msg.sender;

    mapping(string => string) public vinData;
    mapping(address => bool) public dealers;

    event Update(string vin, string data);

    modifier ownerOnly() {
        require(
            msg.sender == owner,
            "You're not authorised to call this funciton"
        );
        _;
    }

    function getData(string memory vin) public view returns (string memory) {
        return vinData[vin];
    }

    function updateData(string memory vin, string memory data) public {
        require(
            dealers[msg.sender],
            "You must be an authorized dealer to update this data"
        );
        vinData[vin] = data;
        emit Update(vin, data);
    }

    function addDealer(address dealer) public ownerOnly {
        dealers[dealer] = true;
    }

}
