package com.xczh.consumer.market.wxpay.json;

import java.lang.reflect.Type;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

/**
 * @author Administrator
 */
public class LongDeserializer implements JsonDeserializer<String> {

    @Override
    public String deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        // TODO Auto-generated method stub
        return String.valueOf(json.getAsJsonPrimitive().getAsLong());
    }

}
