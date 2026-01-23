type DisplayUserDetailsProps = {
  name: string;
  appelation: string;
  capitalizer?: (str: string) => string;
};

const DisplayUserDetails = ({
  name,
  appelation,
  capitalizer,
}: DisplayUserDetailsProps) => {
  return (
    <div>
      <h2>{`Welcome ${capitalizer ? capitalizer(appelation) : appelation} ${name}`}</h2>
    </div>
  );
};

export default DisplayUserDetails;
