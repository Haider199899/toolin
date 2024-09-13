import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateToolDTO } from './dto/create-tool.dto';
import { ToolListResponseType } from './types/get-tools-response.type';
import { CategoryResponseType } from './types/get-categories-response.type';
import { IPaginatedData } from 'src/shared/interfaces/paginated-data.interface';
import { GetToolDTO } from './dto/get-tool.dto';

@ApiTags('Tool')
@Controller('tool')
export class ToolController {
  constructor(private toolService: ToolService) {}
  // Create a new tool
  @Post()
  @ApiOperation({ summary: 'Create a new tool' })
  @ApiResponse({
    status: 201,
    description: 'The tool has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTool(@Body() createToolDto: CreateToolDTO) {
    return this.toolService.create(createToolDto);
  }
  // Get categories list
  @Get('categories')
  @ApiOperation({ summary: 'Get categories list' })
  @ApiResponse({ status: 200, description: 'List all categories' })
  async getCategoriesList(): Promise<CategoryResponseType> {
    return this.toolService.getCategoriesList();
  }

  // Get a tool by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a tool by ID' })
  @ApiResponse({ status: 200, description: 'Tool found.' })
  @ApiResponse({ status: 404, description: 'Tool not found.' })
  async getToolById(@Param('id') id: string) {
    return this.toolService.getTool(id);
  }

  // Get a list of tools
  @Get()
  @ApiOperation({ summary: 'Get a list of tools' })
  @ApiResponse({
    status: 200,
    description: 'Tools retrieved successfully.',
    type: ToolListResponseType,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 400, description: 'Bad Request Exception' })
  async getTools(
    @Query() toolList: GetToolDTO,
  ): Promise<IPaginatedData<ToolListResponseType>> {
    return this.toolService.getTools(toolList);
  }
}
