import { sanitizeHttpHeader } from "@lib/common-library";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Context as McpContext, Tool as McpTool } from "@rekog/mcp-nest";
import { Request as ExpressRequest } from "express";
import {
  HelloWorldDescription,
  HelloWorldParameterSchema,
} from "src/schema/hello-world.schema";
import {
  WeatherSearchDescription,
  WeatherSearchParameterSchema,
} from "src/schema/weather-search.schema";

@Injectable()
export class AppService {
  constructor(private readonly httpSvc: HttpService) {}

  // Hello World 출력
  @McpTool({
    name: "hello-world",
    description: HelloWorldDescription,
    parameters: HelloWorldParameterSchema,
  })
  async hello_world(
    param: HelloWorldParameterSchema,
    context: McpContext,
    request: ExpressRequest,
  ) {
    // 불필요한 헤더 제거
    sanitizeHttpHeader(request);

    // 로직
    return `Hello World ${param.name} ${param.age}`;
  }

  // 정적 날씨 데이터
  private readonly weatherData = {
    seoul: {
      city: "Seoul",
      country: "South Korea",
      temperature: 15,
      unit: "°C",
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      windDirection: "NW",
      lastUpdated: "2026-01-15 14:00:00 KST",
    },
    tokyo: {
      city: "Tokyo",
      country: "Japan",
      temperature: 18,
      unit: "°C",
      condition: "Clear Sky",
      humidity: 55,
      windSpeed: 8,
      windDirection: "E",
      lastUpdated: "2026-01-15 15:00:00 JST",
    },
    newyork: {
      city: "New York",
      country: "United States",
      temperature: 3,
      unit: "°C",
      condition: "Light Snow",
      humidity: 75,
      windSpeed: 18,
      windDirection: "N",
      lastUpdated: "2026-01-15 00:00:00 EST",
    },
  };

  // 날씨 조회 Tool
  @McpTool({
    name: "weather-search",
    description: WeatherSearchDescription,
    parameters: WeatherSearchParameterSchema,
  })
  async weatherSearch(
    param: WeatherSearchParameterSchema,
    context: McpContext,
    request: ExpressRequest,
  ) {
    // 불필요한 헤더 제거
    sanitizeHttpHeader(request);

    // 선택된 도시의 날씨 데이터 가져오기
    const weather = this.weatherData[param.city];

    return {
      message: `Current weather information for ${weather.city}, ${weather.country}`,
      data: weather,
      summary: `🌡️ ${weather.temperature}${weather.unit} | 🌤️ ${weather.condition} | 💧 ${weather.humidity}% | 💨 ${weather.windSpeed} km/h ${weather.windDirection}`,
    };
  }
}
