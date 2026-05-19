import List "mo:core/List";
import InquiryTypes "../types/inquiries";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type Inquiry = InquiryTypes.Inquiry;
  public type InquiryStatus = InquiryTypes.InquiryStatus;

  public func submitInquiry(
    inquiries : List.List<Inquiry>,
    nextId : Nat,
    caller : Principal,
    clientName : Text,
    clientDiscord : Text,
    serviceId : Nat,
    serviceName : Text,
    customDetails : Text,
    priceUSD : Float,
    priceRobux : Nat,
  ) : Inquiry {
    let inquiry : Inquiry = {
      id = nextId;
      clientName;
      clientDiscord;
      serviceId;
      serviceName;
      customDetails;
      priceUSD;
      priceRobux;
      status = #Pending;
      submittedAt = Time.now();
      adminNotes = "";
      caller;
    };
    inquiries.add(inquiry);
    inquiry;
  };

  public func getInquiries(inquiries : List.List<Inquiry>) : [Inquiry] {
    inquiries.toArray()
  };

  public func getInquiriesByCaller(inquiries : List.List<Inquiry>, caller : Principal) : [Inquiry] {
    inquiries.filter(func(i) { Principal.equal(i.caller, caller) }).toArray()
  };

  public func updateInquiryStatus(
    inquiries : List.List<Inquiry>,
    id : Nat,
    status : InquiryStatus,
    notes : Text,
  ) : Bool {
    var found = false;
    inquiries.mapInPlace(
      func(i) {
        if (i.id == id) {
          found := true;
          { i with status; adminNotes = notes };
        } else { i };
      }
    );
    found;
  };
};
