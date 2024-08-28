import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateToolDTO } from './dto/create-tool.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.response';

@ApiTags('Tool')
@Controller('tool')
export class ToolController {
  constructor(private toolService: ToolService,
  ) {}
  // Create a new tool
  @Post()
  @ApiOperation({ summary: 'Create a new tool' })
  @ApiResponse({ status: 201, description: 'The tool has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTool(@Body() createToolDto: CreateToolDTO) {
    return this.toolService.create(createToolDto);
  }
  // Get categories list
  @Get('categories')
  @ApiOperation({ summary: 'Get categories list' })
  @ApiResponse({ status: 200, description: 'List all categories' })
  async getCategoriesList(): Promise<object[]> {
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

  // Get a list of tools by category
  @Get()
  @ApiOperation({ summary: 'Get a list of tools by category' })
  @ApiResponse({ status: 200, description: 'Tools retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiQuery({ name: 'category', required: true, description: 'Category of tools to retrieve' })
  async getTools(@Query('category') category: string) {
    if (!category) {
      throw new BadRequestException('Category not provided!');
    }
    return this.toolService.getTools(category);
  }

  // Create categories
  @Post('categories')
  @ApiOperation({ summary: 'Create categories' })
  @ApiResponse({ status: 201, description: 'Categories created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({type : [CreateCategoryDto]})
  @UsePipes(ValidationPipe)
  async createCategories(@Body() categories: CreateCategoryDto[]): Promise<SuccessMessageResponse> {
    await this.toolService.createCategories(categories);
    return {
      message : 'Successfully created!'
    }
  } 
}
