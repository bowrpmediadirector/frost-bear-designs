import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ContractTypes "../types/contracts";
import ContractsLib "../lib/contracts";

mixin (
  accessControlState : AccessControl.AccessControlState,
  contracts : List.List<ContractTypes.Contract>,
  nextContractId : Nat,
) {
  var _nextContractId : Nat = nextContractId;

  public shared ({ caller }) func createContract(
    clientName : Text,
    clientDiscord : Text,
    serviceType : Text,
    serviceDetails : Text,
    totalPriceUSD : Float,
    totalPriceRobux : Nat,
    terms : Text,
  ) : async ContractTypes.Contract {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create a contract");
    };
    let id = _nextContractId;
    _nextContractId += 1;
    ContractsLib.createContract(
      contracts, id, caller, clientName, clientDiscord,
      serviceType, serviceDetails, totalPriceUSD, totalPriceRobux, terms,
    );
  };

  public shared ({ caller }) func signContract(
    id : Nat,
    signatureText : Text,
  ) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to sign a contract");
    };
    ContractsLib.signContract(contracts, id, caller, signatureText);
  };

  public query ({ caller }) func getMyContracts() : async [ContractTypes.Contract] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view your contracts");
    };
    ContractsLib.getContractsByCaller(contracts, caller);
  };

  public query ({ caller }) func getAllContracts() : async [ContractTypes.Contract] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all contracts");
    };
    ContractsLib.getAllContracts(contracts);
  };
};
