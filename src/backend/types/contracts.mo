module {
  public type ContractStatus = {
    #Draft;
    #Signed;
    #Completed;
  };

  public type Contract = {
    id : Nat;
    clientName : Text;
    clientDiscord : Text;
    serviceType : Text;
    serviceDetails : Text;
    totalPriceUSD : Float;
    totalPriceRobux : Nat;
    terms : Text;
    signatureText : Text;
    status : ContractStatus;
    createdAt : Int;
    caller : Principal;
  };
};
