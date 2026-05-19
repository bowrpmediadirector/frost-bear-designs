import List "mo:core/List";
import ContractTypes "../types/contracts";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type Contract = ContractTypes.Contract;
  public type ContractStatus = ContractTypes.ContractStatus;

  public func createContract(
    contracts : List.List<Contract>,
    nextId : Nat,
    caller : Principal,
    clientName : Text,
    clientDiscord : Text,
    serviceType : Text,
    serviceDetails : Text,
    totalPriceUSD : Float,
    totalPriceRobux : Nat,
    terms : Text,
  ) : Contract {
    let contract : Contract = {
      id = nextId;
      clientName;
      clientDiscord;
      serviceType;
      serviceDetails;
      totalPriceUSD;
      totalPriceRobux;
      terms;
      signatureText = "";
      status = #Draft;
      createdAt = Time.now();
      caller;
    };
    contracts.add(contract);
    contract;
  };

  public func signContract(
    contracts : List.List<Contract>,
    id : Nat,
    caller : Principal,
    signatureText : Text,
  ) : Bool {
    var found = false;
    contracts.mapInPlace(
      func(c) {
        if (c.id == id and Principal.equal(c.caller, caller)) {
          found := true;
          { c with signatureText; status = #Signed };
        } else { c };
      }
    );
    found;
  };

  public func getContractsByCaller(contracts : List.List<Contract>, caller : Principal) : [Contract] {
    contracts.filter(func(c) { Principal.equal(c.caller, caller) }).toArray()
  };

  public func getAllContracts(contracts : List.List<Contract>) : [Contract] {
    contracts.toArray()
  };
};
