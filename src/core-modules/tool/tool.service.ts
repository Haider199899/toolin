import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../core-modules/auth/auth.service';
import { db } from '../../config/firebase-config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateToolDTO } from './dto/create-tool.dto';
import { trackingDates } from '../../shared/utils/tracking-fields';

@Injectable()
export class ToolService {
  private categoriesCollection = db.collection("categories");
  private toolsCollection = db.collection('tools');
  constructor(
    private readonly authService  : AuthService
  ) {}

  async create(createToolDto: CreateToolDTO) {
    const categorySnapShot = await this.categoriesCollection
    .where('name', '==', createToolDto.category).limit(1)
    .get();
    if(categorySnapShot.empty){
      throw new NotFoundException('category not found!')
    }
      const doc = categorySnapShot.docs[0]; // Get the first document
      const additionalParameters = {
        categoryId : doc.id,
        ...trackingDates
      }
      
    const toolDoc = this.toolsCollection.doc();
    await toolDoc.set({...createToolDto,...additionalParameters});
    return { id: toolDoc.id, ...createToolDto };
  }

  async getTool(id: string) {
    const toolDoc = await this.toolsCollection.doc(id).get();
    if (!toolDoc.exists) {
      throw new NotFoundException('Tool not found');
    }
    return toolDoc.data();
  }

  async getTools(category: string) {
    const toolsSnapshot = await this.toolsCollection.where('category' ,'==',category).get();
    if(toolsSnapshot.empty) {
      throw new NotFoundException('Tools not found')
    }
    return toolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  async createCategories(
    categories: CreateCategoryDto[],
  ): Promise<void> {
    const batch = db.batch();
   
    for (const category of categories) {
      // Check if a category with the same name already exists
      const existingCategory = await this.categoriesCollection
        .where('name', '==', category.name)
        .get();

      if (!existingCategory.empty) {
        continue
      }
      // If the category does not exist, add it to the batch
      const categoryRef = this.categoriesCollection.doc(); // No need to await here
      batch.set(categoryRef, {...category,...trackingDates} );
    }

    await batch.commit();
  }
  async getCategoriesList(): Promise<object[]> {
    const snapshot = await this.categoriesCollection.get();
    const categories = [];
    snapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  }

  async findTool(toolId: string): Promise<any> {
    const toolDoc = await this.toolsCollection
      .where('id', '==', toolId)
      .get();
    if (toolDoc.empty) {
      throw new NotFoundException(`Tool Not found.`);
    }
    return toolDoc;
  }


}
