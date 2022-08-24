// import { connect } from 'react-redux/es/exports';
import { inc, dec, rnd } from '../action';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="jumbotron">
      <h1>{counter}</h1>
      <button onClick={() => dispatch(inc())} className="btn btn-primary">
        INC
      </button>
      <button onClick={() => dispatch(dec())} className="btn btn-primary">
        DEC
      </button>
      <button onClick={() => dispatch(rnd())} className="btn btn-primary">
        RND
      </button>
    </div>
  );
};

export default Counter;

// Classic no-hook
// const mapStateToProps = (state) => {
//   return {
//     counter: state.value,
//   };
// };

// // const mapDispatchToProps = (dispatch) => {
// //   return bindActionCreators(actions, dispatch);
// // };
//

// export default connect(mapStateToProps, actions)(Counter);
