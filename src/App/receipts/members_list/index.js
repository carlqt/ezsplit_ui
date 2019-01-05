import { connect } from "react-redux";
import MembersList from './members_list';

const mapStateToProps = state => {
  return {
    members: state.homeStore.get('members'),
  }
};

const mapDispatchToProps = {
  getMembers,
};

export default connect(mapStateToProps,mapDispatchToProps)(MembersList);
