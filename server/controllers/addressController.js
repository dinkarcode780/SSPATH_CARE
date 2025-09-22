import Address from "../models/addressModel.js";
import Admin from "../models/adminModel.js";

// Add a new address to an admin
export const addAddress = async (req, res) => {
  try {
    const userId = req.id;
    console.log(userId);

    const {
      name,
      number,
      locality,
      pincode,
      address,
      city,
      landmark,
      addressType,
    } = req.body;

    if (
      !userId ||
      !name ||
      !number ||
      !locality ||
      !pincode ||
      !address ||
      !city
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = await Address.create({
      userId,
      name,
      number,
      locality,
      pincode,
      address,
      city,
      landmark,
      addressType,
    });

    // await newAddress.save();

    // Add address to the admin's address array
    await Admin.findByIdAndUpdate(userId, {
      $push: { addresses: newAddress._id },
    });

    res
      .status(201)
      .json({ success: true, message: "Address added successfully",data:newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all addresses for a specific user
export const getAddresses = async (req, res) => {
  try {
    const userId = req.id;

    const addresses = await Address.find({ userId }).select("-userId"); // Excluding userId field

    if (!addresses) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an address
export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const {
      name,
      number,
      locality,
      pincode,
      address,
      city,
      landmark,
      addressType,
    } = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { name, number, locality, pincode, address, city, landmark, addressType },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({success:true, message: "Address updated successfully", data:updatedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Remove address from the user's address array
    await Admin.updateOne(
      { addresses: addressId },
      { $pull: { addresses: addressId } }
    );

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
