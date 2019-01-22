import { connect } from "react-redux";
import { claimItems } from 'Actions/receipts';
import Claim from './claim';

const mapStateToProps = state => {
  return {
    homeStore: state.homeStore,
  }
};

const mapDispatchToProps = {
  claimItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
