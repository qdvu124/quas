import React from 'react';

class BookForm extends React.Component {
    render () {
        return (
            <div className="form">
                <form>
                    Name: <input /> <br />
                    Edition: <input /> <br />
                    Author: <input /> <br />
                    Publisher: <input /> <br />
                    <input type="Submit" />
                </form>
            </div>
        );
    }
}

export default BookForm;