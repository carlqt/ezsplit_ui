import { connect } from "react-redux";
import { closeAlert, openAlert } from 'Actions/app';
import Alert from './alert';

const mapStateToProps = state => {
  return {
    alert: state.appStore.get('alert'),
  }
};

const mapDispatchToProps = {
  closeAlert,
  openAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
