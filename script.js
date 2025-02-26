import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";

console.log("Script loaded");  // Check if the script is loading

// Initialize the wallet selector and modal
async function initializeWallet() {
  try {
    console.log("Initializing wallet...");  // Log at the start of initialization

    // Setup the Wallet Selector with the MeteorWallet module
    const selector = await setupWalletSelector({
      network: "testnet",  // Set the appropriate network (testnet or mainnet)
      modules: [setupMeteorWallet()],  // Add MeteorWallet module for wallet options
    });

    console.log("Wallet selector set up successfully.");  // Log successful wallet selector setup

    // Setup the modal UI with the selector and contract ID
    const modal = setupModal(selector, {
      contractId: "test.testnet",  // Replace with your actual contract ID
    });

    console.log("Modal set up successfully.");  // Log successful modal setup

    // Get the 'Connect Wallet' button and set up an event listener
    const connectButton = document.getElementById("open-wallet-selector");
    console.log("Button found:", connectButton);  // Log if the button was found

    if (connectButton) {
      connectButton.addEventListener("click", () => {
        console.log("Button clicked!");  // Log when the button is clicked
        modal.show();  // Show the wallet modal when button is clicked
      });
    } else {
      console.log("Connect Wallet button not found!");  // Log if the button is not found
    }

    // Optional: Listen for changes in the wallet connection
    selector.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        console.log("Connected to wallet:", accounts[0].address);  // Log the wallet address
      } else {
        console.log("No wallet connected.");
      }
    });

  } catch (error) {
    console.error("Error initializing wallet selector:", error);  // Log any error that occurs during initialization
  }
}

// Initialize the wallet selector when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded. Initializing wallet.");
  initializeWallet();
});
