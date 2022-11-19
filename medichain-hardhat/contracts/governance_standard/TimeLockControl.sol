// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./TimelockController.sol";

contract  TimeLock is TimelockController{
    // minDelay: you gotta wait for this duration at least before executing the proposed changes. 
    // proposers: list of addresses that are gonna be able to propose any changes. 
    // executers: who can execute when a proposal goes through
    constructor(
        uint256 minDelay, 
        address [] memory proposers,
        address [] memory executors
    ) TimelockController(minDelay, proposers, executors) {}
}
