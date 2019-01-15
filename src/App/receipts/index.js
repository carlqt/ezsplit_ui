import { connect } from "react-redux";
import { getReceipts } from 'Actions/receipts';
import Receipts from './receipts';

const mapStateToProps = state => {
  return {
    receipts: state.receiptsStore,
  }
};

const mapDispatchToProps = {
  getReceipts
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
