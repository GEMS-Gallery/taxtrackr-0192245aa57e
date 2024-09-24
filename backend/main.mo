import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";

actor {
  // Define a record type for TaxPayer
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Use a stable variable to store TaxPayer records
  stable var taxpayers: [TaxPayer] = [];

  // Function to add a new TaxPayer record
  public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text): async Text {
    let newTaxPayer: TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxpayers := Array.append(taxpayers, [newTaxPayer]);
    return "TaxPayer added successfully";
  };

  // Function to get all TaxPayer records
  public query func getAllTaxPayers(): async [TaxPayer] {
    return taxpayers;
  };

  // Function to search for a TaxPayer by TID
  public query func searchTaxPayerByTID(tid: Text): async ?TaxPayer {
    return Array.find<TaxPayer>(taxpayers, func (tp) { tp.tid == tid });
  };
}
