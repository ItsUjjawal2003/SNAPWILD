import torch
import torch.nn as nn
import torchvision.models as models
from torchvision.models import ResNet18_Weights

class AnimalRecognitionModel(nn.Module):
    def __init__(self, num_classes=90):
        super(AnimalRecognitionModel, self).__init__()
        # Use a pre-trained ResNet18 model
        self.base_model = models.resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
        # Replace the final fully connected layer
        in_features = self.base_model.fc.in_features
        self.base_model.fc = nn.Linear(in_features, num_classes)

    def forward(self, x):
        return self.base_model(x)

# Utility function to load the model
def load_model(model_path, num_classes=90):
    # Instantiate the model
    model = AnimalRecognitionModel(num_classes=num_classes)
    # Load the saved state dictionary
    state_dict = torch.load(model_path, map_location=torch.device('cpu'))
    # Adjust keys in the state dictionary to match the model architecture
    new_state_dict = {}
    for key, value in state_dict.items():
        if key.startswith("base_model."):
            new_state_dict[key] = value
        else:
            new_key = "base_model." + key
            new_state_dict[new_key] = value
    model.load_state_dict(new_state_dict)
    model.eval()
    return model