module {
  public type InquiryStatus = {
    #Pending;
    #InReview;
    #Completed;
    #Cancelled;
  };

  public type Inquiry = {
    id : Nat;
    clientName : Text;
    clientDiscord : Text;
    serviceId : Nat;
    serviceName : Text;
    customDetails : Text;
    priceUSD : Float;
    priceRobux : Nat;
    status : InquiryStatus;
    submittedAt : Int;
    adminNotes : Text;
    caller : Principal;
  };
};
