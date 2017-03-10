import React, { Component } from 'react';

const SearchContainer = (WrappedComponent) => 
	class extends Component {
		constructor(props) {
			super(props);
		}

		get_search_regex = (escaped_search_string) => {
	    return new RegExp(escaped_search_string, "i");//"^" + 
	  }

	  get_highlight_regex = (escaped_search_string) => {
	    return new RegExp("\\b" + escaped_search_string, "i");//\b匹配字母、数字、下划线
	  }

	  search_string_match = function(search_string, regex) {
	    // var i, len, part, parts;
	    if (regex.test(search_string)) {
	      return true;
	    } 
	    // else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
	    //   parts = search_string.replace(/\[|\]/g, "").split(" ");
	    //   if (parts.length) {
	    //     for (i = 0, len = parts.length; i < len; i++) {
	    //       part = parts[i];
	    //       if (regex.test(part)) {
	    //         return true;
	    //       }
	    //     }
	    //   }
	    // }
	  }

		render() {
			const newProps = {
				wrapSearchProps: {
					search_string_match: this.search_string_match,
					get_highlight_regex: this.get_highlight_regex,
					get_search_regex: this.get_search_regex
				}
			}
			return (
				<WrappedComponent {...this.props} {...newProps} />
			)
		}
	}

export default SearchContainer;