import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ServicesMixin "mixins/services-api";
import InquiriesMixin "mixins/inquiries-api";
import ContractsMixin "mixins/contracts-api";
import GalleryMixin "mixins/gallery-api";
import ReleasesMixin "mixins/releases-api";
import ServicesTypes "types/services";
import InquiryTypes "types/inquiries";
import ContractTypes "types/contracts";
import GalleryTypes "types/gallery";
import ReleaseTypes "types/releases";
import ServicesLib "lib/services";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Services catalog — seeded with default Frost & Bear Designs services on first deploy
  let services = List.empty<ServicesTypes.Service>();
  ServicesLib.initDefaultServices(services);
  include ServicesMixin(accessControlState, services);

  // Inquiry / order system
  let inquiries = List.empty<InquiryTypes.Inquiry>();
  var nextInquiryId : Nat = 0;
  include InquiriesMixin(accessControlState, inquiries, nextInquiryId);

  // Contracts
  let contracts = List.empty<ContractTypes.Contract>();
  var nextContractId : Nat = 0;
  include ContractsMixin(accessControlState, contracts, nextContractId);

  // Gallery
  let galleryItems = List.empty<GalleryTypes.GalleryItem>();
  var nextGalleryId : Nat = 0;
  include GalleryMixin(accessControlState, galleryItems, nextGalleryId);

  // Free releases
  let freeReleases = List.empty<ReleaseTypes.FreeRelease>();
  var nextReleaseId : Nat = 0;
  include ReleasesMixin(accessControlState, freeReleases, nextReleaseId);
};
