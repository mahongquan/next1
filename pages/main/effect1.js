const HomePage = (props) => {
    
  props.setAuthenticated(true);

  const handleChange = (e) => {
    props.setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div key={props.restInfo.storeId} className="container-fluid">
      <ProductList searchResults={props.searchResults} />
    </div>
  );
};
Now you can change it to:

const HomePage = (props) => {
  // trigger on component mount
  useEffect(() => {
    props.setAuthenticated(true);
  }, []);

  const handleChange = (e) => {
    props.setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div key={props.restInfo.storeId} className="container-fluid">
      <ProductList searchResults={props.searchResults} />
    </div>
  );
};