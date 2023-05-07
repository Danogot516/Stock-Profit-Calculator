#include <iostream>
#include <node_api.h>
#include <utility>
#include <stdexcept>
#include <limits>

std::pair<size_t, size_t> FindProfitPrices(const int* prices, size_t length) {
	if (length < 2) {
		throw std::runtime_error("Array must contain at least 2 elements.");
	}
	
	int current_price = prices[0];
	size_t current_price_index = 0;
	int max_profit = 0;

	size_t min_price_index = 0;
	size_t max_price_index = 0;

	for (size_t i = 1; i < length; i++) {
		if (prices[i] < current_price) {
			current_price = prices[i];
			current_price_index = i;
		} else if (prices[i] - current_price > max_profit) {
			min_price_index = current_price_index;
			max_price_index = i;
			max_profit = prices[i] - current_price;
		}
	}

	if (max_profit == 0) {
		throw std::runtime_error("No profit can be made.");
	}

	return std::make_pair(min_price_index, max_price_index);
}

napi_value FindProfitPricesWrapper(napi_env env, napi_callback_info info) {
	size_t argc = 1;
	napi_value argv[1];
	napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

	if (argc < 1) {
		napi_throw_type_error(env, nullptr, "Expected a TypedArray as the argument");
		return nullptr;
	}

	napi_typedarray_type type;
	size_t length;
	void* data;
	napi_value arraybuffer;
	size_t byte_offset;
	napi_get_typedarray_info(env, argv[0], &type, &length, &data, &arraybuffer, &byte_offset);

	if (type != napi_int32_array) {
		napi_throw_type_error(env, nullptr, "Expected an Int32Array as the argument");
		return nullptr;
	}

	int32_t* prices = static_cast<int32_t*>(data);

	try {
		auto min_max_indexes = FindProfitPrices(prices, length);

		napi_value result;
		napi_create_object(env, &result);

		napi_value min_price_index_value, max_price_index_value;
		napi_create_uint32(env, min_max_indexes.first, &min_price_index_value);
		napi_create_uint32(env, min_max_indexes.second, &max_price_index_value);

		napi_set_named_property(env, result, "minPriceIndex", min_price_index_value);
		napi_set_named_property(env, result, "maxPriceIndex", max_price_index_value);

		return result;
	} catch (const std::runtime_error& e) {
		napi_value error;
		napi_create_string_utf8(env, e.what(), NAPI_AUTO_LENGTH, &error);
		napi_throw(env, error);
		return nullptr;
	}
}

napi_value Init(napi_env env, napi_value exports) {
	napi_value find_profit_prices_wrapper_fn;
	napi_create_function(env, "FindProfitPrices", NAPI_AUTO_LENGTH, FindProfitPricesWrapper, nullptr, &find_profit_prices_wrapper_fn);
	napi_set_named_property(env, exports, "findProfitPrices", find_profit_prices_wrapper_fn);

	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)