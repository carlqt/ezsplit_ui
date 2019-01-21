import { connect } from "react-redux";
import Claim from './claim';

const mapStateToProps = state => {
  return {
    homeStore: state.homeStore,
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
