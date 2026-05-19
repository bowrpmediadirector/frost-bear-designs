import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import InquiryTypes "../types/inquiries";
import InquiriesLib "../lib/inquiries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiries : List.List<InquiryTypes.Inquiry>,
  nextInquiryId : Nat,
) {
  var _nextInquiryId : Nat = nextInquiryId;

  public shared ({ caller }) func submitInquiry(
    clientName : Text,
    clientDiscord : Text,
    serviceId : Nat,
    serviceName : Text,
    customDetails : Text,
    priceUSD : Float,
    priceRobux : Nat,
  ) : async InquiryTypes.Inquiry {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to submit an inquiry");
    };
    let id = _nextInquiryId;
    _nextInquiryId += 1;
    InquiriesLib.submitInquiry(
      inquiries, id, caller, clientName, clientDiscord,
      serviceId, serviceName, customDetails, priceUSD, priceRobux,
    );
  };

  public query ({ caller }) func getInquiries() : async [InquiryTypes.Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    InquiriesLib.getInquiries(inquiries);
  };

  public shared ({ caller }) func updateInquiryStatus(
    id : Nat,
    status : InquiryTypes.InquiryStatus,
    notes : Text,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update inquiry status");
    };
    InquiriesLib.updateInquiryStatus(inquiries, id, status, notes);
  };

  public query ({ caller }) func getMyInquiries() : async [InquiryTypes.Inquiry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view your inquiries");
    };
    InquiriesLib.getInquiriesByCaller(inquiries, caller);
  };
};
